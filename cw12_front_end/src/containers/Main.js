import React, {Component, Fragment} from 'react';
import '../App.css'
import {deletePhoto, getPhoto, getPhotos} from "../store/actions/photoActions";
import connect from "react-redux/es/connect/connect";
import ImageThumbnail from "../components/ImageThumbnail";
import {Link, NavLink} from "react-router-dom";


class Main extends Component {

    state = {
      popUpShow: false
    };

    componentDidMount() {
        this.props.getPhotos();
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.props.getPhotos();
        }
    }

    photoInfo = e =>{
        const id = e.target.id;
        this.props.getPhoto(id);
        this.setState({popUpShow: true})
    };

    userPhotos = e =>{
        const id = e.target.id;
        this.props.getPhoto(id);
    };

    closePopUp = e =>{
        this.setState({popUpShow: false})
    };

    deletePhoto = e => {
        this.props.deletePhoto(e.target.id);
    };


    render() {

        return (
            <div className="App">
                <div className="list_div">
                    <div className="column">
                        <p className="photo_p">Cocktails</p>
                        {this.props.photos ? this.props.photos.map(item => {
                            return <div className="photo_thumbnail" key={item._id} id={item._id}>
                                <ImageThumbnail image={item.image} class="img_thumbnail"/>
                                <span id={item._id} onClick={this.photoInfo} className="photo_title">{item.title}</span>
                                <span>by : </span><NavLink to={"/user_photos/" + item.user._id} exact onClick={this.userPhotos}>{item.user.name}</NavLink>
                                <div>
                                {this.props.user && this.props.user._id === item.user._id ?
                                    <button id={item._id} className="delete_btn"
                                            onClick={this.deletePhoto}>Delete</button> : null}
                                </div>
                            </div>
                        }) : null}
                    </div>
                </div>
                {this.state.popUpShow && this.props.photo ? <div className="pop_up" onClick={this.closePopUp}>
                    {<div className="big_img_div"><ImageThumbnail image={this.props.photo.image} class="big_img_thumbnail"/>
                        <p className="photo_p border" onClick={this.closePopUp}>Close</p></div>}
                </div> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    photos: state.photo.photos,
    photo: state.photo.photo,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    getPhotos: () => dispatch(getPhotos()),
    getPhoto: id => dispatch(getPhoto(id)),
    deletePhoto: id => dispatch(deletePhoto(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);