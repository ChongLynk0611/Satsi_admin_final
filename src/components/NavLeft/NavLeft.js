import React, {useState} from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import DirectionsIcon from '@material-ui/icons/Directions';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import WorkIcon from '@material-ui/icons/Work';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

import NavItem from 'components/NavItem/NavItem'

import Logo from 'assets/images/logo3.png';

import './NavLeft.css';

const ListItem = [
    {
        icon:<HomeIcon style={{fontSize:"24px"}} />,
        content:"Trang chủ",
        href:"/"
    },
    {
        icon: <PostAddIcon style={{fontSize:"24px"}}/>,
        content:"Ngành nghề du học",
        href:"/DangBai"
    },
    {
        icon: <MenuIcon style={{fontSize:"24px"}}/>,
        content:"Tin tức",
        href:"/TinTuc"
    },
    {
        icon: <InfoIcon style={{fontSize:"24px"}}/>,
        content:"Về Satsi",
        href:"/VeSatsi"
    },
    {
        icon: <DirectionsIcon style={{fontSize:"24px"}}/>,
        content:"Lộ trình",
        href:"/LoTrinh"
    },
    {
        icon: <CastForEducationIcon style={{fontSize:"24px"}}/>,
        content:"Đào tạo",
        href:"/DaoTao"
    },
    {
        icon: <WorkIcon style={{fontSize:"24px"}}/>,
        content:"Học nghề-Khởi nghiệp",
        href:"/HocNgheKhoiNghiep"
    },
    {
        icon: <AccessibilityIcon style={{fontSize:"24px"}}/>,
        content:"Hoạt động học viên",
        href:"/HoatDong"
    },
    {
        icon: <PhonelinkSetupIcon style={{fontSize:"24px"}}/>,
        content:"Công nghệ",
        href:"/CongNghe"
    },

]

function NavLeft() {
    const [indexFocus, setIndexFocus] = useState(0);

    const onClick = (index) => {
        return () => {
            setIndexFocus(index);
        }
    }

    return (
        <div className="NavLeft">
            <div className="overlay"></div>
            <div className="NF-body">
                <div className="NL-title">
                    <img  src={Logo} alt="Logo"/>
                </div>
                <div className="NL-ListItem">
                    {
                        ListItem.map((item, index) => {
                            if(index === indexFocus){
                                return(
                                    <NavItem 
                                        item={item} 
                                        isFocus={true} 
                                        key={index}
                                        onClick = {onClick(index)}
                                    />
                                ) 
                            }
                            return(
                                <NavItem 
                                    item={item} 
                                    isFocus={false} 
                                    key={index}
                                    onClick = {onClick(index)}
                                />
                            ) 
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default NavLeft

