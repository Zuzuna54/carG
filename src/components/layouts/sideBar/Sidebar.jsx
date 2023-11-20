import { useNavigate } from 'react-router-dom';
import './SideBar.scss';

export default function SideBar() {
    const navigate = useNavigate();
    return (

        <div className='sideBar'>
            <div className='nav-menu'>
                <div className='line-div'>
                    <div className='liner'></div>
                </div>
                <div className='main-clicker' onClick={() => { navigate(`/dashboard/homepage`) }} >
                    <div> Home </div>
                </div>
                <div className='main-clicker' onClick={() => { navigate(`/dashboard/calculator`) }} >
                    <div> Calculator </div>
                </div>
                <div className='main-clicker' onClick={() => { navigate(`/dashboard/about-us`) }} >
                    <div> About Us </div>
                </div>
                <div className='main-clicker' onClick={() => { navigate(`/dashboard/contact-us`) }} >
                    <div> Contact Us/Support </div>
                </div>
                <div className='line-div'>
                    <div className='liner'></div>
                </div>
            </div>

        </div>
    );
}
