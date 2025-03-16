
function PromotionalPopupMenu() {
    return ( 
         <div className="promotionalpopupmenu" style={{marginTop:5,position:"absolute", top:"100%", left:0, color:"#000",
            backgroundColor:"#fff", display:"none"
         }}>
            <ul style={{ padding: 0, margin: "0px 0px 5px 0px", listStyle: "none", width:250, 
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
            }}>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Chọn khuyến mãi mới</li>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Khuyến mãi đang chạy</li>
            </ul>
         </div>
     );
}

export default PromotionalPopupMenu;