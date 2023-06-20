import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/redux/viewFullPropertySlice';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const getConfigurableProps = () => ({
  showArrows: boolean('showArrows', true, tooglesGroupId),
  showStatus: boolean('showStatus', true, tooglesGroupId),
  showIndicators: boolean('showIndicators', true, tooglesGroupId),
  infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
  showThumbs: boolean('showThumbs', true, tooglesGroupId),
  useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
  autoPlay: boolean('autoPlay', true, tooglesGroupId),
  stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
  swipeable: boolean('swipeable', true, tooglesGroupId),
  dynamicHeight: boolean('dynamicHeight', true, tooglesGroupId),
  emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
  autoFocus: boolean('autoFocus', false, tooglesGroupId),
  thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
  selectedItem: number('selectedItem', 0, {}, valuesGroupId),
  interval: number('interval', 2000, {}, valuesGroupId),
  transitionTime: number('transitionTime', 500, {}, valuesGroupId),
  swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
  ariaLabel: text('ariaLabel', undefined),
});


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
      width={'100vw'}
    >
      <Carousel dynamicHeight={true} autoPlay={true} showThumbs={true}>
        {importedImages.map((image, index) => (
          <div>
            <Image key={index} src={image} alt={`Image ${index + 1}`} className="property-image" />
          </div>
        ))}
      </Carousel>
    </Modal>
  );
};

export default ViewFullProperty;
