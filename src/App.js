import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            pictures: [],
            indexValue: 1,
            tagCathegory: 'snow',
            limit: 10
        }
    }

    componentDidMount() {
        this.reloadImages();
    }

    handleChange = (e) => {
        this.setState({
            tagCathegory: e.target.value !== '' ? e.target.value : 'snow',
            limit: 10

        });
    }

    loadMoreImages = () => {
        this.setState({limit: this.state.limit + 10}, () => {
            this.reloadImages();
        })
    }

    Delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            setTimeout(callback, ms);
        }
    })();

    reloadImages = () => {
        console.log(this.state.limit);
        fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7a1702c706ba9d2e0c036dc43aab032b&tags=' + this.state.tagCathegory + '&per_page=' + this.state.limit + '&format=json&nojsoncallback=1')
            .then(function (response) {
                return response.json();
            }).then(function (j) {
            let picArray = j.photos.photo.map((pic) => {
                let scrPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
                return (
                    <img alt="alt" src={scrPath} key={pic.id}/>
                )
            })
            this.setState({pictures: picArray});
        }.bind(this))
    }

    render() {
        return (
            <div className="App">
                <input type="text" placeholder="Search images"
                       onChange={this.handleChange}
                       onKeyUp={() => this.Delay(function () {
                           this.reloadImages();
                       }.bind(this), 1000)}
                />
                <div className="pictures-list">
                    {this.state.pictures}
                </div>

                <button onClick={this.loadMoreImages}>Show More</button>

            </div>
        );
    }
}

export default App;
