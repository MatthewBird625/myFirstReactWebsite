import { Card } from "react-bootstrap";

//this just serves as a nice space filler on the login page
const EmployeeReminder = () => {
  return (
    <Card className="text-center  bg-secondary text-white my-4 py-4">
      <strong>A reminder to all employees:</strong> It is a violation of your
      terms of employment at LAN to share any login or access details with
      another employee or third party without explicit approval from management{" "}
    </Card>
  );
};

export default EmployeeReminder;
