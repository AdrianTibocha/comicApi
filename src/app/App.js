import React,{Component} from 'react';

class App extends Component {

    constructor(){
        super();
        this.state={
            id:"",
            titulo:"",
            imagen:"",
            comics:[],
            its:false,
            cali_prev:"",
            cali_guar:0
        }

        this.vercomic = this.vercomic.bind(this);
        this.vermas = this.vermas.bind(this);
        this.calificar = this.calificar.bind(this);
    }

   
    componentDidMount(){

        fetch('./api/comic')
        .then(res => res.json())
        .then(data => {
            this.setState({comics:data});
        }).catch(err=>{
            console.error(err);
        });

        let num = parseInt(Math.random() * (2104 - 1) + 1);
        const proxyurl = "https://protected-peak-24614.herokuapp.com/";
        let url = "https://xkcd.com/"+num+"/info.0.json";
        fetch(proxyurl+url)
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                titulo:data.title,
                imagen: data.img
            })
        })
        .catch(err=>{
            console.error(err);
        })
    }


    vercomic(titulo,imagen,calificacion,id){
        this.setState({
            id:id,
            titulo:titulo,
            imagen:imagen,
            cali_prev:calificacion,
            its:true
        })
    }
    
    vermas(){

        fetch('./api/comic')
        .then(res => res.json())
        .then(data => {
            this.setState({comics:data});
        }).catch(err=>{
            console.error(err);
        });

        let num = parseInt(Math.random() * (2104 - 1) + 1);
        const proxyurl = "https://protected-peak-24614.herokuapp.com/";
        let url = "https://xkcd.com/"+num+"/info.0.json";
        fetch(proxyurl+url)
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                titulo:data.title,
                imagen: data.img
            })
            fetch(`./api/comic/${data.title}`)
            .then(rs=>rs.json())
            .then(dat=>{
                if(dat.length>0){
                    this.setState({
                        id:dat[0]._id,
                        cali_prev:dat[0].calificacion,
                        its:true
                    })
                }else{
                    this.setState({
                        id:"",
                        cali_prev:"",
                        its:false
                    })
                }
            })
        })
        .catch(err=>{
            console.error(err);
        })


    }

    calificar(){

        if(this.state.cali_guar!=0){
        if(this.state.its){
                fetch(`./api/comic/${this.state.id}`,{
                method: 'PUT',
                body:JSON.stringify(this.state),
                headers :{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }         
            })
            .then(res => res.json())
            .then(data => {
                let cali=parseInt((this.state.cali_prev+this.state.cali_guar)/2);
                this.setState({cali_prev:cali});
                let actu=[];
                for(let i=0;i<this.state.comics.length;i++){
                    if(this.state.comics[i].titulo==this.state.titulo){
                        actu[i]={
                            _id:this.state.comics[i]._id,
                            titulo:this.state.titulo,
                            imagen:this.state.comics[i].imagen,
                            calificacion:cali
                        };
                    }else{
                        actu[i]=this.state.comics[i];
                    }
                }
                this.setState({comics:actu});
                alert('comic calificado');
                let est = document.getElementsByName('estrellas');
                for(let i=0;i<est.length;i++){
                    if(est[i].checked){
                        est[i].checked = !est[i].checked;
                    }
                }
        })
        }else{
            
            fetch('./api/comic',{
                method:'POST',
                body:JSON.stringify(this.state),
                headers :{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(res=> res.json())
            .then(data => {
                let cal = this.state.cali_guar;
                this.setState({cali_prev:cal});
                let est = document.getElementsByName('estrellas');
                for(let i=0;i<est.length;i++){
                    if(est[i].checked){
                        est[i].checked = !est[i].checked;
                    }
                }
                alert('comic calificado')
            })
            .catch(err => console.log(err));
        }
    }else{
        alert('no se ha seleccionado la calificacion del comic');
    }
    }

render(){

        return(
        <>
        <div className="lista">
                <h1> Comics calificados </h1>
            { 
                
                this.state.comics.map(comic =>{
                   
                    return(
                        
                    
                <section onClick={()=>{this.vercomic(comic.titulo,comic.imagen,comic.calificacion,comic._id)}} key={comic._id}>
                    
                    <article>
                    <h1>Titulo</h1>
                    <h1>{comic.titulo}</h1>
                    <br/>
                    <h3>Calificacion :</h3>

                    <h3>

                         {(() => {
                            switch (comic.calificacion) {
                            case 1:   return "★";
                            case 2: return "★★";
                            case 3:  return "★★★";
                            case 4:  return "★★★★";
                            case 5:  return "★★★★★";
                            }
                        })()}

                    </h3>

                    </article>
                    <div>
                    <img src={comic.imagen} className="fluid" alt=""/>
                    </div>

                </section>
                
                            
                    )

                })
                
            }

        </div>
            
                <div className="comic" >

                <h1>{this.state.titulo}</h1>

                <br/>
                
                <img src={this.state.imagen} className="fluid" alt=""/>

                <br/>
                
                <h1>
                {(() => {
                            switch (this.state.cali_prev) {
                            case 1:   return "Calificacion: ★"
                            case 2: return "Calificacion: ★★"
                            case 3:  return "Calificacion: ★★★"
                            case 4:  return "Calificacion: ★★★★"
                            case 5:  return "Calificacion: ★★★★★"
                            default: return "Sin calificacion"
                            }
                        })()}
                        </h1>

                <form>
                <p className="clasificacion">
                    <input id="radio1" type="radio" name="estrellas" value="5" onClick={()=>this.setState({cali_guar:5})}/>
                    <label htmlFor="radio1">★</label>
                    <input id="radio2" type="radio" name="estrellas" value="4" onClick={()=>this.setState({cali_guar:4})}/>
                    <label htmlFor="radio2">★</label>
                    <input id="radio3" type="radio" name="estrellas" value="3" onClick={()=>this.setState({cali_guar:3})}/>
                    <label htmlFor="radio3">★</label>
                    <input id="radio4" type="radio" name="estrellas" value="2" onClick={()=>this.setState({cali_guar:2})}/>
                    <label htmlFor="radio4">★</label>
                    <input id="radio5" type="radio" name="estrellas" value="1" onClick={()=>this.setState({cali_guar:1})}/>
                    <label htmlFor="radio5">★</label>
                </p>
                
                </form>

                        <div className="accion">
                    <button onClick={()=>this.calificar()}>Calificar</button>

                    <button onClick={()=>this.vermas()}>Ver mas</button>
                        </div>

                </div>
            
            </>
        )
    }
    

}

export default App;