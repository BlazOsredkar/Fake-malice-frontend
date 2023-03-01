import React, {useEffect} from "react";
import "../style/karticaMalice.css";
import {useSelector} from "react-redux";
import {selectUser} from "../auth/userSlice";
import axios from "axios";
import {backendAPIendpoint} from "../App";

const KarticaMalica = ({ime, opis, slika, id, reload, selected, menuDate}) => {

  const user = useSelector(selectUser)
  const [nowDate, setDateNow] = React.useState(new Date());
  const [date, setDate] = React.useState(new Date());

  const handleDeleteMeni = async () => {

    const potrditev = window.confirm("Ali ste prepričani, da želite izbrisati meni?");

    if (potrditev) {
        try {
          await axios.delete(`${backendAPIendpoint}/meni/delete/`, {withCredentials: true, data: {id: id}});
            reload();
        }
        catch (e) {}
    }
  }

  const handleNaroci = async () => {
    try {
      await axios.post(`${backendAPIendpoint}/meni/order/`, {meni:id},{withCredentials: true});
        reload();
    }
    catch (e) {}
  }

  useEffect(() => {
    const dateNow = new Date()
    dateNow.setHours(0,0,0,0);
    setDateNow(dateNow);
    const dateMenu = new Date(menuDate)
    dateMenu.setHours(0,0,0,0);
    setDate(dateMenu);
  }, [menuDate])



  return (
    <>
      <div className="karticaMalic">
        <div className="karticaMalica__gumb">
          {selected ? <button style={{backgroundColor: "green", cursor: "not-allowed"}} >Naročeno</button> : nowDate.getTime() !== date.getTime() ? <button onClick={handleNaroci}>Naroči</button> : null }
          {user.isadmin ?  <button onClick={handleDeleteMeni}>Izbriši</button> : <> </>}
          {user.isadmin ?  <button>Uredi</button> : <> </>}
        </div>
        <div className="karticaMalica__slika">
          <img src={slika} alt="slika malice" height={150} />
        </div>

        <div className="karticaMalica__opis">
          <h3>{ime}</h3>
          <p>{opis}</p>
        </div>
      </div>
    </>
  );
};

export default KarticaMalica;
