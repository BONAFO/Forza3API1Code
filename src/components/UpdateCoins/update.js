import Store from "@/assets/store.manager";
import { create_token , unzip_token  } from "@/assets/zip";



export const update_coins =()=>{

  

    Swal.fire({
      title: "UPDATE COINS",
      html : `
      <label>ACTUAL COINS: ${Store.get("save").coins}</label>
            
      `,
      input: "number",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm:  (coins) => {
        const data = Store.get("save");
        data.coins = parseInt(coins);
        Store.save('save', data)
        create_token(data)
      },
      customClass:Store.get('custom_style')[0]
    });
  
    document.getElementById("swal2-html-container").className += " title-cus";
  }
  