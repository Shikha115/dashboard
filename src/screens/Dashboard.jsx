import React from "react";
import styled from "styled-components";
import { images } from "../components/Images";
import { useNavigate } from "react-router-dom";

export const LogoComp = () => {
  return (
    <AView>
      <Text size={60}>R</Text>
      <Text size={40}>ojgar </Text>
      <Text size={60}>A</Text>
      <Text size={40}>pp</Text>
    </AView>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  return;
  return (
    <Root>
      <LogoComp />
      <Container>
        <View style={{ marginBottom: "20px" }}>
          <View style={{ marginRight: 20 }}>
            <Image
              src={images.Frame_1}
              width={220}
              style={{ position: "absolute" }}
            />
            <Image
              src={images.Screenshot_1}
              width={170}
              height={360}
              style={{ borderRadius: 20, marginTop: 0 }}
            />
          </View>
          <View>
            <Image
              src={images.Frame_1}
              width={220}
              style={{ position: "absolute" }}
            />
            <Image
              src={images.Screenshot_1}
              width={170}
              height={360}
              style={{ borderRadius: 20, marginTop: 0 }}
            />
          </View>
        </View>
        <RView
          style={{
            flexDirection: "column",
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <Image2 src={images.play_store} width={200} height={80} />
          <Image2 src={images.download_apk} width={200} height={80} />
          <View
            style={{
              width: 200,
              height: 70,
              backgroundColor: "black",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ color: "white", fontWeight: "500" }}
              size={30}
              onClick={() => navigate("/dashboard")}
            >
              Go to web
            </Text>
          </View>
        </RView>
      </Container>
    </Root>
  );
}

export default Dashboard;

const Root = styled.div`
  background-color: #ffedd8;
  flex: 1;
  /* height: 100vh; */
`;

const Text = styled.span`
  font-size: ${(props) => props.size}px;
  color: #481e14;
`;

const Image = styled.img`
  width: ${(props) => props.width ?? 200}px;
  height: ${(props) => props.height ?? 400}px;
`;
const Image2 = styled.img`
  border-radius: 10px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  flex: 1;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const AView = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  left: 20px;
  top: 0px;
`;
const View = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const RView = styled(View)`
  margin-left: 30px;
  @media (max-width: 768px) {
  }
`;
