const appModul={
    start :function(){
        const btn=document.querySelector(".add__btn")
        btn.addEventListener('click',this.handleClick)
        document.querySelector(".container").addEventListener("click",this.removeOnList)

        document.querySelector(".item__delete--btn").addEventListener("click",this.hand2)

    },

    removeOnList:function(event){
        let divFather=event.target
        let alldivFather=divFather.parentElement.parentElement.parentElement.parentElement
        alldivFather.parentElement.removeChild(alldivFather)
       
    },

    handleClick :function(){
        const data=UIModul.getinputFromUI();
       
        UIModul.addIncOrExp(data)
        UIModul.UpdateUI(data)
   
    },

    hand2:function(){

        const id= document.querySelector("#income-")
        BugetModul.removeInc(id)
    }
    
    


}

const UIModul={
    getinputFromUI:function(){
        const type=document.querySelector(".add__type").value
        const text=document.querySelector(".add__description").value
        const money=document.querySelector(".add__value").value
        const data={
            type:type,
            text:text,
            money:money
        }
        return data;

    },
    addIncOrExp:function(input){
        if(input.type=="inc"){
            let html = 
            '<div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            let stringResult = html.replace('Salary', input.text)

            stringResult = stringResult.replace('2,100.00', input.money)

            let idInc="income-"+ BugetModul.incList.length
            
            let IncObj={
                id:idInc,
                value:input.money
            }


            stringResult=stringResult.replace("income-0",idInc)
            BugetModul.addInc(IncObj)
            


            document.querySelector('.income__list').insertAdjacentHTML('beforeend',stringResult)

            


        }



        else{
            const html2 = 
            '<div class="item clearfix" id="expense-0"><div class="item__description">Apartment rent</div><div class="right clearfix"><div class="item__value">- 900.00</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            let stringResult2 = html2.replace('Apartment rent', input.text)

            stringResult2 = stringResult2.replace('900.00', input.money)



            let idExp="income-"+BugetModul.expList.length
           
           
            
            let ExpOjb={
                id:idExp,
                value:input.money
            }

            stringResult2=stringResult2.replace("expense-0",idExp)
            BugetModul.addExp(ExpOjb)
            
            let Percnet=Math.round((ExpOjb.value)/(BugetModul.totalExpList())*100)
            
            stringResult2=stringResult2.replace("21",Percnet)


            document.querySelector('.expenses__list').insertAdjacentHTML('beforeend',stringResult2)



        }
    },

    UpdateUI:function(input){
        if(input.type=="inc"){
           var moneyInc= document.querySelector(".budget__income--value")

            moneyInc.textContent="+ " + BugetModul.totalIncList()

        }
        else{
            var moneyExp=document.querySelector(".budget__expenses--value")
            moneyExp.textContent ="- "+ BugetModul.totalExpList()
        }

        let BugetValue=document.querySelector(".budget__value")


        let TitleTotal=BugetModul.totalIncList()-BugetModul.totalExpList()
        
        if(TitleTotal>0){
            BugetValue.textContent="+ " + TitleTotal
        }
        else{
            BugetValue.textContent="- "+Math.abs(TitleTotal)
        }

        let PercnetFather=document.querySelector(".budget__expenses--percentage")
        let Percent=Math.round((BugetModul.totalExpList()/BugetModul.totalIncList()) *100)
        console.log(Percent)
        PercnetFather.textContent=Percent+" %"


        



    }
}

const BugetModul={
     incList :[ ],
     expList :[ ],

    addInc :function(obj){
        this.incList.push(obj)
    },

    addExp :function(obj){
        this.expList.push(obj)
        
    },

    removeInc:function(idInc){
        for(i=0;i<this.incList.length;i++){
            if(this.incList[i].id==idInc){

                this.incList.splice(i,1)
            }
        }
        
    },

    removeExp:function(idExp){
        for(i=0;i<this.expList.length;i++){
            if(this.expList[i].id==idExp){

                this.expList.splice(i,1)
            }
        }
        
    },

    totalIncList:function(){
        let sum1=0
        for(i=0;i<this.incList.length;i++){
            sum1+=parseInt(this.incList[i].value)
        }
        return sum1;
    },

    totalExpList:function(){
        let sum2=0;
        for(i=0;i<this.expList.length;i++){
            sum2+=parseInt(this.expList[i].value)
        }
        return sum2;
    }









}

appModul.start()