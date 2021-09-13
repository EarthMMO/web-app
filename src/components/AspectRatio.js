import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    height: 0,
  },
  inner: {
    // Fill parent aspect ratio
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // Center contents
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
}));

function AspectRatio(props) {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        paddingBottom: (1 / props.ratio) * 100 + "%",
      }}
    >
      <div className={classes.inner}>{props.children}</div>
    </div>
  );
}

export default AspectRatio;
