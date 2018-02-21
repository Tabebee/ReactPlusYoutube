import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash'; // Instead of defining it as lodash the commonly used term is to refer to it is actually an underscore

//  Componenets
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//  Key
import APIKEY from './components/config';
const API_KEY = APIKEY.Key;

//  Create a new component. Should produce some HTML

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        // YTSearch({ key: API_KEY, term: 'surfboards' }, (videos) => {
        //     // console.log(videos);
        //     this.setState({
        //         videos,
        //         selectedVideo: videos[0]
        //     });
        // //    this.setState({ videos: videos });
        // });

        this.videoSearch('surfboards')
    }

    //  Callback for searching videos
    videoSearch(term) {
        YTSearch({
            key: API_KEY,
            term: term // or just term
        }, (videos) => {
            // console.log(videos);
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
            //    this.setState({ videos: videos });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={ videoSearch }  /> {/* This throttles the loading (dont search too often */}
                {/*<SearchBar onSearchTermChange={ term => this.videoSearch(term) }  />*/}
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo }) }
                    videos={this.state.videos} /> {/* referred to as passing props */}
            </div>
        );
    }
}

// const App = () => {
//     return (
//         <div>
//             <SearchBar />
//         </div>
//     );
// }

//  take component's generated HTML and put it on page
//      (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));