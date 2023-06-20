import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/redux/viewFullPropertySlice';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';


const ViewFullProperty = () => {
  const dispatch = useDispatch();
  const { isModalOpened } = useSelector((state) => state.fullPropertyModal);
  const [importedImages, setImportedImages] = useState([]);

  useEffect(() => {
    const importImages = async () => {
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

      setImportedImages(importedImages);
    };

    importImages();
  }, []);

  return (
    <Modal
      open={isModalOpened}
      onOk={() => dispatch(closeModal())}
      onCancel={() => dispatch(closeModal())}
      footer={false}
      width={'100vh'}
    >
      <Carousel dynamicHeight={true} autoPlay={true} showThumbs={true} infiniteLoop={true}>
        {importedImages.map((image, index) => (
          <div key={index}>
            <Image key={index} src={image} alt={`Image ${index + 1}`} className="property-image" />
          </div>
        ))}
      </Carousel>
    </Modal>
  );
};

export default ViewFullProperty;
