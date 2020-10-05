import React, { useContext, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
import ProfileContext from "../../context/profile/profileContext";
import Typography from "@material-ui/core/Typography";
import Santander from "../../images/banco-santander-logo-41.png";
import Santander15 from "../../images/banco-santander-logo-41 (1).png";

const Navigation = () => {
  const { navs, api, userProfile, getUserProfile } = useContext(ProfileContext);
  const imagem = {
    Santander: Santander15,
  };

  useEffect(() => {
    if (api) getUserProfile();
  }, []);

  useEffect(() => {
    console.log(userProfile.clients);
  }, [userProfile]);

  return userProfile.clients.map((e) => (
    <>
      <Divider />
      {console.log(Santander)}
      <List>
        <ListItem className="sl-menu-li" button key={e} component={Link}>
          <ListItemIcon>
            <img
              src={imagem[e]}
              alt={e}
              srcset={imagem[e]}
              width={30}
              height={30}
            />
          </ListItemIcon>
          <ListItemText primary={e} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {navs[e].views.map((nav) => (
          <ListItem
            className="sl-menu-li"
            button
            key={nav.name}
            component={Link}
            to={nav.to}
          >
            <ListItemIcon>
              <Icon>{nav.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={nav.name} />
          </ListItem>
        ))}
      </List>
    </>
  ));
};

export default Navigation;
