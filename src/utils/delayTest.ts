const delayTest = async (wait: number) => {
  await new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, wait);
  });
};

export default delayTest;
