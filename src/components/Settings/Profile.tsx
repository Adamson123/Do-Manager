import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schemas";
import { useRef, useState, useTransition } from "react";
import updateProfileAction from "@/actions/updateProfileAction";
import { useDispatch, useSelector } from "react-redux";
import { RawUserTypes } from "@/types/userTypes";
import { RootState } from "@/store/store";
import { toast } from "../ui/hooks/use-toast";
import { updateUser } from "@/features/userSlice";

const Profile = () => {
  const {
    id: userId,
    name,
    image: imageId,
  } = useSelector<RootState, RawUserTypes>((state) => state.user.userInfo);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name,
      image: "",
      userId,
    },
  });
  const [loading, startTransition] = useTransition();
  const [pickedImage, setPickedImage] = useState<MediaSource | File | string>(
    "",
  );
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleProfileUpdate = async (
    profile: z.infer<typeof profileSchema>,
  ) => {
    if (loading) return;
    const { image, name, userId } = profile;

    const formData = new FormData();
    formData.append("image", image as Blob);
    formData.append("name", name);
    formData.append("userId", userId);
    formData.append("imageId", imageId as string);

    startTransition(() => {
      updateProfileAction(formData).then((response) => {
        const responseErr = response as { errMsg: string };
        if (responseErr.errMsg) {
          toast({
            title: responseErr.errMsg,
            description:
              "Operation completed with an error, Please check your internet connection",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Profile update",
            description: "Operation completed successfully",
          });
          dispatch(updateUser(response as Partial<RawUserTypes>));
          if (imageRef.current) imageRef.current.value = "";
          form.resetField("image", { defaultValue: "" });
          setPickedImage("");

          // Revalidate("/");
        }
      });
    });
  };

  const userImgPath = imageId?.startsWith("https://")
    ? imageId
    : `/images/${imageId}.webp`;

  const userImg = imageId ? userImgPath : "/images/defaultImg.webp";

  const cancel = pickedImage || name !== form.getValues().name;

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(handleProfileUpdate)}
      >
        <FormDescription className="font-bold text-[16px] border-b pb-2">
          Profile
        </FormDescription>
        {/* Username */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-1">
              <FormLabel className="text-muted-foreground text-[13px]">
                Username
              </FormLabel>
              {/* input */}
              <FormControl>
                <Input type="text" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-sm text-muted-foreground">
                3/40
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-1">
              <FormLabel className="text-muted-foreground text-[13px]">
                Profile picture
              </FormLabel>
              {/* Avatar */}
              <div className="flex flex-col gap-2">
                <div className="relative h-[80px] w-[80px]">
                  <Image
                    src={
                      pickedImage
                        ? URL.createObjectURL(pickedImage as MediaSource)
                        : userImg
                    }
                    alt="Profile image"
                    className="object-cover rounded border border-darkerBg"
                    fill
                    quality={100}
                  />
                </div>

                <FormControl>
                  <Input
                    type="file"
                    ref={imageRef}
                    onChange={(event) => {
                      const image = event.target.files
                        ? event.target.files[0]
                        : "";
                      if (image) {
                        image.type.startsWith("image/") &&
                          setPickedImage(image);
                      }
                      field.onChange(image);
                    }}
                    placeholder="Choose image"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" className="rounded">
            {loading ? "Updating..." : "Update profile"}
          </Button>
          {cancel && (
            <Button
              onClick={() => {
                form.resetField("name", { defaultValue: name });
                if (imageRef.current) imageRef.current.value = "";
                setPickedImage("");
              }}
              variant="destructive"
              className="rounded"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default Profile;
