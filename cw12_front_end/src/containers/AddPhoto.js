import React, {Component} from 'react';
import {addPhoto} from "../store/actions/photoActions";
import connect from "react-redux/es/connect/connect";
import FormElement from "../components/FormElement";
import nanoid from "nanoid"

class AddPhoto extends Component {

    state = {
        title: '',
        image: null,
    };


    submitFormHandler = e => {
        e.preventDefault();
        if (this.state.image) {
            let formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key] !== null) {
                    formData.append(key, this.state[key]);
                }
            });
            this.props.addPhoto(formData);
        } else {
            this.props.addPhoto(this.state)
        }
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    fileChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {

        return (
            <div className="form_div">

                <div className="main_nav">
                </div>
                <div className="album_form">
                    <h3 className="h3">Add Photo</h3>
                    <form className="form" onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="title"
                            title="Title"
                            type="text"
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('title')}
                            placeholder="Enter your desired title"
                            autocomplete="new-title"
                            required
                        />
                        {this.getFieldError('title') && (<div className="invalid-feedback">
                            {this.getFieldError('title')}
                        </div>)}
                        <label htmlFor="image">Image</label>
                        <input type="file" name="image" id="image" required onChange={this.fileChangeHandler}/>
                        {this.getFieldError('image') && (<div className="invalid-feedback">
                            {this.getFieldError('image')}
                        </div>)}
                        <button type="submit" className="field_save_btn">Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    photos: state.photo.photos,
    error: state.photo.error,
});

const mapDispatchToProps = dispatch => ({
    addPhoto: (cocktailData) => dispatch(addPhoto(cocktailData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);