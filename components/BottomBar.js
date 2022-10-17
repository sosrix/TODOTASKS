import TabBar from "enhanced-fluid-bottom-navigation-bar";

export default function BottomBar({ onTab }) {
  return (
    <TabBar
      onPress={(tabIndex) => {
        onTab(tabIndex);
      }}
      values={[
        {
          title: "Home",
          icon: "bars",
          iconSet: "AntDesign",
          size: 32,
        },
        {
          title: "New Task",
          icon: "edit",
          iconSet: "AntDesign",
          size: 32,
        },
      ]}
    />
  );
}
