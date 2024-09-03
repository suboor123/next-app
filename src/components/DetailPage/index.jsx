import React from 'react'
import SevenXL from '../7xl';
import SectionHeading from '../SectionHeading';
import ImageContent from './ImageContent';
import FiveXL from '../5xl';
import Content from './Content';

const DetailPage = ({ entity = {} }) => {
  const { name, description } = entity;

  return (
    <section className="relative px-5 md:px-0">
    <FiveXL>
        <SectionHeading
            title={name}
            description={description}
        />
        <ImageContent entity={entity} />
        <Content entity={entity} />
    </FiveXL>
</section>
  )
}

export default DetailPage