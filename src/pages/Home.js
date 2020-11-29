import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import Card from "../components/Card";
const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    height: "calc(100vh - 19.0625rem)",
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Home = () => {
  const classes = stylesFunc();
  const [userList, setUserList] = useState();
  const { REACT_APP_BASE_URL, REACT_APP_API_TOKEN } = process.env;

  const fectchData = async () => {
    const response = await axios.get(`${REACT_APP_BASE_URL}user`, {
      headers: {
        "app-id": REACT_APP_API_TOKEN,
      },
    });

    setUserList(response.data.data);
  };

  useEffect(() => {
    // axios
    //   .get(`${REACT_APP_BASE_URL}user`, {
    //     headers: {
    //       "app-id": REACT_APP_API_TOKEN,
    //     },
    //   })
    //   .then((res) => setUserList(res?.data?.data));
    fectchData();
  }, []);

  console.log(userList);
  return (
    <Container className={classes.wrapper}>
      <Grid container spacing={2} justify-content="space-between">
        {userList?.map((user) => {
          /* 
        email: "heinz-georg.fiedler@example.com"
        firstName: "Heinz-Georg"
        id: "0F8JIqi4zwvb77FGz6Wt"
        lastName: "Fiedler"
        picture: "https://randomuser.me/api/portraits/men/81.jpg"
        title:
 */
          return (
            <Grid key={user.id} item xs={3}>
              <Card
                userImage={user.picture}
                userName={user.firstName}
                userEmail={user.email}
                userId={user.id}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;
