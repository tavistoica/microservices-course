const profile = (props) => {
  return (
    <>
      <div>{`Email: ${props.currentUser.email}`}</div>
      <div>{`Role: ${props.currentUser.role}`}</div>
    </>
  );
};

export default profile;
