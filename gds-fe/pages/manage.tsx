import ManageContent from "../components/Manage";
import AuthWrapper from "../components/AuthWrapper";

export default function Manage() {
  console.log("I am in the manage page");
  return (
    <AuthWrapper>
      <ManageContent />
    </AuthWrapper>
  );
}
