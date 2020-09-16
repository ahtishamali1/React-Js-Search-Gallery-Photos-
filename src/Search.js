import React, { Component } from 'react'
import axios from "axios"
import Images from "./Images"
export default class Search extends Component {
    state = {
        keyword: '',
        photos: [],
        loader: false

    }
    inputHandle = (e) => {
        this.setState({ keyword: e.target.value })
    }
    searchImages = async (e) => {
        e.preventDefault();
        this.setState({ loader: true });
        const res = await axios.get(`https://api.pexels.com/v1/search?query=${this.state.keyword}&per_page=30&page=1`,
            {
                headers: {
                    Authorization: '563492ad6f917000010000013590a85f1b4445fd9ca13cddc179b982'
                }
            }
        );

        this.setState({ loader: false });
        this.setState({ photos: res.data.photos });
        //console.log(this.state.photos);
    }
    render() {
        return (
            <>
                <form onSubmit={this.searchImages}>
                    <div className="form-group">
                        <input type="text" name="keyword"
                            className="form-control"
                            value={this.state.keyword}
                            onChange={this.inputHandle} placeholder="Search images...." />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            value="Search images"
                            className="btn btn-primary btn-block" />
                    </div>
                </form>
                <div className="row">
                    {
                        !this.state.loader ? (
                            this.state.photos.map(img => (
                                <Images image={img} key={img.id} />
                            ))
                        ) : (<h1>Loading...</h1>)
                    }
                </div>
            </>
        )
    }
}
