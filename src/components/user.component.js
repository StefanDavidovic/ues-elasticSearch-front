import React, {useContext} from 'react'
import UserService from '../services/UserService'


export default class UserComponent extends React.Component{


    constructor(props){
        super(props)
        this.state = {
            articles:[]
        }



        // this.addArticle = this.addArticle.bind(this);
        this.viewArticle = this.viewArticle.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        // this.getImages = this.getImages.bind(this);
    }

    componentDidMount(){
        UserService.getArticles().then((response) =>{
            this.setState({articles:response.data})
        });

    }
    viewArticle(id){
        this.props.history.push(`viewUsers/${id}`);
    }

    // addArticle(){
    //     this.props.history.push('/addArticle');
    // }

    deleteArticle(id){
        UserService.deleteArticle(id).then(res => {
            window.location.reload()
            this.setState({artikli: this.state.articles.filter(articles => articles.id !== id)});
            this.props.history.push('/users')

        });

    }



    editArticle(id){
        this.props.history.push(`/updateArticle/${id}`);
    }





    render(){
        return (
            <div>
                <h1 className="text-center"> Artikli </h1>
            
                <div className="row">
                    

                </div>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Last Name</b></td>
                            <td><b>Username</b></td>
                            <td><b>Actions</b></td>

                        </tr>
                    </thead>
                    

                    <tbody>

                        {
                            
                            this.state.articles.map(
                                article=>
                                    <tr key = {article.id}>
                                    
                                        <td> {article.firstname}</td>
                                        <td>{article.lastname}</td>
                                        <td>{article.username}</td>
                                        <td>
                                        {!article.blocked ? 
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteArticle(article.id)} className="btn btn-danger">Blokiraj</button>
                                        : 
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteArticle(article.id)} className="btn btn-success">Odblokiraj</button>}
                                        
                                        </td>
                                    </tr>
                            )   
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}