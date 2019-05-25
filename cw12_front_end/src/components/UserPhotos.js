import React, {Component, Fragment} from 'react';
import {deletePhoto, getPhoto, getPhotos} from "../store/actions/photoActions";
import connect from "react-redux/es/connect/connect";
import ImageThumbnail from "../components/ImageThumbnail";
import {Link, NavLink} from "react-router-dom";

class UserPhotos extends Component {


    state = {
        popUpShow: false
    };

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getPhotos(this.props.match.params.id)
    }

    photoInfo = e => {
        const id = e.target.id;
        this.props.getPhoto(id);
        this.setState({popUpShow: true})
    };


    closePopUp = e => {
        this.setState({popUpShow: false})
    };

    render() {

        return (
            <div className="list_div">
                <div className="column">
                    <p className="photo_p">Photos</p>
                    {this.props.photos && this.props.photos.length !== 0 ? this.props.photos.map(item => {
                        return <div className="photo_thumbnail" key={item._id} id={item._id}>
                            <ImageThumbnail image={item.image} class="img_thumbnail"/>
                            <span id={item._id} onClick={this.photoInfo} className="photo_title">{item.title}</span>
                            <span>by : </span><span>{item.user.name}</span>
                        </div>
                    }) : <p>No photos yet</p>}
                </div>
                {this.state.popUpShow && this.props.photo ? <div className="pop_up" onClick={this.closePopUp}>
                    {<div className="big_img_div"><ImageThumbnail image={this.props.photo.image}
                                                                  class="big_img_thumbnail"/>
                        <p className="photo_p border" onClick={this.closePopUp}>Close</p></div>}
                </div> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    photos: state.photo.photos,
    photo: state.photo.photo,
});

const mapDispatchToProps = dispatch => ({
    getPhotos: (userId) => dispatch(getPhotos(userId)),
    deletePhoto: id => dispatch(deletePhoto(id)),
    getPhoto: id => dispatch(getPhoto(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPhotos);