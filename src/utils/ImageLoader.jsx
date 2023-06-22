const ImageLoader = async () => {

      const imageNames = Array.from(
        { length: 12 },
        (_, index) => `batu-bolong-gallery${index + 1}.jpg`
      );

      const importedImages = await Promise.all(
        imageNames.map(async (imageName) => {
          const { default: image } = await import(
            `../assets/BatuBolongVilla/${imageName}`
          );
          return image;
        })
      );

      return importedImages

}

export default ImageLoader