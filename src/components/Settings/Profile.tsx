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
import { useState } from "react";
import updateProfileAction from "@/actions/updateProfileAction";
import { useSelector } from "react-redux";
import { RawUserTypes } from "@/types/userTypes";
import { RootState } from "@/store/store";

const Profile = () => {
  const {
    id: userId,
    name,
    image,
  } = useSelector<RootState, RawUserTypes>((state) => state.user.userInfo);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name,
      image: "",
      userId,
    },
  });
  const [pickedImage, setPickedImage] = useState<MediaSource | File | string>(
    ""
  );

  const handleProfileUpdate = async (
    profile: z.infer<typeof profileSchema>
  ) => {
    const formData = new FormData();
    formData.append("image", profile.image);
    formData.append(
      "info",
      JSON.stringify({ name: profile.name, userId: profile.userId })
    );
    updateProfileAction(formData);
  };
  const userImg = image ? `/images/${image}.webp` : "/images/defaultImg.webp";
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
                    onChange={(event) => {
                      const image = event.target.files
                        ? event.target.files[0]
                        : "";
                      setPickedImage(image);
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
        <Button type="submit" className="rounded">
          Update profile
        </Button>
      </form>
    </Form>
  );
};

export default Profile;
