import { slide as Menu } from "react-burger-menu";

export default (props) => {
  return <Menu {...props}>{props.data}</Menu>;
};
