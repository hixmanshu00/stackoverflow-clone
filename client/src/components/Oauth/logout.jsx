import { GoogleLogout } from "react-google-login";

const clientID =
  "1015261864356-ffheklri6rstoqh52bedddgr5bsi0r0b.apps.googleusercontent.com";

const Logout = ({ handleLogout }) => {
  const onSuccess = () => {
    console.log("LOGOUT Success");
    handleLogout();
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientID}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
        onLogoutSuccess={onSuccess}
        onFailure={(err) => console.log("fail", err)}
        icon={false}
        className="btn"
      />
    </div>
  );
};

export default Logout;
