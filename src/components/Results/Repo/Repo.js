import React from "react";
import styled from "@emotion/styled";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
`;

const Image = styled.img``;

const CardBody = styled.section`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Repo = ({
  name,
  description,
  primaryLanguage,
  url,
  openGraphImageUrl,
  stargazerCount,
}) => {
  return (
    <Card>
      <CardBody>
        <Image src={openGraphImageUrl} alt="repo" />
        <a href={url} target="_blank" rel="noreferrer">
          <h4>{name}</h4>
        </a>
        <>{`* ${stargazerCount}`}</>
        <p>{`Language: ${primaryLanguage}`}</p>
        <p>{description}</p>
      </CardBody>
    </Card>
  );
};

export default Repo;
