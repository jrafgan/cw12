import React, {Component, Fragment} from 'react';
import {deletePhoto, getPhotos} from "../store/actions/photoActions";
import connect from "react-redux/es/connect/connect";
import ImageThumbnail from "../components/ImageThumbnail";
import {Link} from "react-router-dom";

class MyPhotos extends Component {

    componentDidMount() {
        this.props.getPhotos(this.props.user._id)
    }

    deletePhoto = e => {
        this.props.deletePhoto(e.target.id);
    };

    render() {

        return (
                <div className="list_div">
                    <div className="column">
                        <p className="photo_p">My Photos</p>
                        {this.props.photos && this.props.photos.length !== 0 ? this.props.photos.map(item => {
                            return <div className="photo_thumbnail" key={item._id} id={item._id}>
                                <ImageThumbnail image={item.image} class="img_thumbnail"/>
                                <span>{item.title}</span>
                                <div>
                                    {this.props.user ?
                                        <button id={item._id} className="delete_btn"
                                                onClick={this.deletePhoto}>Delete</button> : null}
                                </div>
                            </div>
                        }) : <p>No photos yet</p>}
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    error: state.photo.error,
    photos: state.photo.photos,
});

const mapDispatchToProps = dispatch => ({
    getPhotos: (userId) => dispatch(getPhotos(userId)),
    deletePhoto: id => dispatch(deletePhoto(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPhotos);