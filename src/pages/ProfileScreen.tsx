import authService from "@/appwrite/authService";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/slices/authSlice";
import { randomProfilepictureType } from "@/utils/constants/pfp";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import { AuthState } from "@/redux/store/store";
export default function Component() {
  const user: Models.User<Models.Preferences> | undefined = useSelector(
    (state: AuthState) => state.auth.userData
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center justify-center w-full h-[90vh] bg-white text-gray-800">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            alt="User avatar"
            src={`https://api.dicebear.com/7.x/${randomProfilepictureType()}/svg`}
          />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <div className="flex space-x-4">
          <Button
            className="bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={() => {
              navigate("/reads");
            }}
          >
            Reads
          </Button>
          <Button
            className="border-blue-500 text-blue-500 hover:bg-blue-100"
            variant="outline"
            onClick={() => {
              authService.logout().then((res) => {
                console.log(res);
                dispatch(logout());
                window.location.href = "/";
              });
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
