/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { slide as Menu } from "react-burger-menu";

export default (props) => <Menu {...props}>{props.data}</Menu>;
