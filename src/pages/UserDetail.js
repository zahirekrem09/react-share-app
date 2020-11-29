import React, { useEffect, useState } from "react";
import { formatDistance, subDays } from "date-fns";

import { useParams } from "react-router-dom";
import { fectchData } from "../helpers/api";

const UserDetail = () => {
  const [detailData, setDetailData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await fectchData(`user/${id}`);
      setDetailData(data);
    };
    getData();
    // fectchData(`user/${userId}`).then((res) => setDetailData(res));
  }, [id]);

  console.log(detailData);

  return <div></div>;
};

export default UserDetail;
