import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiRequest } from "../../utils/index";

function Profile(props) {
  const [profileURL, setProfileURL] = useState(null);
  const [equipmentURLs, setEquipmentURLs] = useState([]);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // make API call
    let { userId } = router.query;
    console.log(userId, router);
    if (!userId)
      userId =
        window.location.href.split("/")[
          window.location.href.split("/").length - 1
        ];
    // window.location.

    const fetchURLs = async () => {
      try {
        const { profileHash, badgesHash } = await apiRequest(
          `user/all-nfts/${userId}`,
          "GET"
        );
        const _profileURL = `https://ipfs.io/ipfs/${profileHash}`;
        console.log({ badgesHash });
        const _equipmentURL = [];
        badgesHash.forEach((hash) => {
          console.log({ hash });
          _equipmentURL.push(`https://ipfs.io/ipfs/${hash}`);
        });
        console.log({ _equipmentURL });
        setProfileURL(_profileURL);
        setEquipmentURLs(_equipmentURL);
        setIsLoading(false);
      } catch (e) {
        console.log("Error : ", e);
        setIsLoading(true);
      }
    };
    fetchURLs();
  }, []);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div
      style={{
        width: "100%",
        padding: "40px",
        display: "grid",
        gridTemplateColumns: "50% 50%",
        textAlign: "center",
      }}
    >
      <div style={{ padding: "40px" }}>
        <img src={profileURL} alt="profile nft picture" />
      </div>
      <div
        style={{
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "33.33% 33.33% 33.33%",
        }}
      >
        {equipmentURLs.map((equipment, i) => (
          <img key={i} src={equipment} alt="equipment nft picture" />
        ))}
      </div>
    </div>
  );
}

export default Profile;
