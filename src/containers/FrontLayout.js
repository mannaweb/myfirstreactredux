import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../components/Header/Header';
import { Link } from 'react-router-dom';
const FrontLayout = ({ site, title, seoTitle, ...props }) => {

  const pathname = window.location.pathname;
  return (
    <>
     <Header setKeyword={props.setKeyword} keyword={props.keyword}/>
   <section className="section-common">
   
    <div className="section-navigation">
    <div className="left-nav">
      <div className={`navigation-item ${pathname === '/' ? "active" : ""}`}><Link to="/" className="navigation-link">Videos You Might Like</Link></div>
      <div className={`navigation-item ${pathname === '/learning' ? "active" : ""}`}><Link to="/learning" className="navigation-link">Learning Tracks</Link></div>
      <div className={`navigation-item ${pathname === '/my-classroom' ? "active" : ""}`}><Link to="/my-classroom" className="navigation-link">My Classroom</Link></div>
    </div>
    </div>

    <div className="video-section">
     { props.children }
     </div>
   </section>
    </>
  )
}

const mapStateToProps = state => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps, null)(FrontLayout);