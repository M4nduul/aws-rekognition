import { useContext, useState } from "react";
import { ScreenContainer } from ".";
import { Button, FileInput, Text } from "../components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearcgIcon } from "../assets/searchIcon.svg";
import { Loader } from "../components/loader";
import { AuthContext } from "../provider/authContext";

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

export const HomeScreen = () => {
  const { user, token } = useContext(AuthContext);
  const navigation = useNavigate();
  console.log(token)
  const onPress = () => {
    navigation("/signIn");
  };
  return user ? (
    <ScreenContainer justifyContent="justify-between" className="flex-col">
      <Header />
      <Content />
      <Footer />
    </ScreenContainer>
  ) : (
    <ScreenContainer>
      <Button className="pv-14 ph-30 mt-10 h-6-vh" onClick={onPress}>
        <Text fontSize="24">Sign in</Text>
      </Button>
    </ScreenContainer>
  );
};


const Content = () => {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [searching, setSearching] = useState(false);

  const upload = async () => {
    const params = {
      Bucket: 'date1201',
      Key: `uploads/image.jpeg`,
      ContentType: 'image/jpeg'
    }

    const url = await s3.getSignedUrl('putObject', params);

  }

  return (
    <div className="w-60-vw flex justify-between align-center">
      <div className="relative flex-col align-center">
        <FileInput
          onFileSelect={(file: any) => setSelectedFile(file)}
          label="Click to upload"
        />
        {selectedFile && (
          <Button className="absolute pv-20 ph-20 mt-10 bottom-1" onClick={upload}>
            <Text fontSize="16">Upload to AWS</Text>
          </Button>
        )}
      </div>

      {searching ? (
        <Loader />
      ) : (
        <div className="pointer" onClick={() => setSearching(true)}>
          <SearcgIcon className="w-10-vw h-10-vw" />
          <Text fontSize="24">Search from AWS</Text>
        </div>
      )}

      <div className="image w-20-vw h-20-vw" />
    </div>
  );
};

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="flex h-6-vh align-center w-80-vw justify-between mt-10">
      <Text fontSize="32">{`user : ${user.username}`}</Text>
      <Button className="pv-14 ph-30" onClick={logout}>
        <Text fontSize="24">Log out</Text>
      </Button>
    </div>
  );
};

const Footer = () => {
  return (
    <Text fontSize="16" className="mb-20">
      Made by ❤️
    </Text>
  );
};
