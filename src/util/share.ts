const share = async (options: {
  url?: string;
  title?: string;
  text?: string;
}) => {
  //@ts-ignore
  if (navigator.share) {
    //@ts-ignore
    await navigator.share(options);
  } else {
    console.error("Sharing not supported.");
  }
};

export default share;
