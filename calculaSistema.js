function gaussSolver(tam){
    let A = [];  
    for(let i=0; i<tam; i++) {
        A[i] = [];
        for(let j=0; j<tam; j++) {
            let termo = "M"+tam.toString()+"a"+(i+1).toString()+(j+1).toString();
            let elemento = document.getElementById(termo).value;
            elemento = parseInt(elemento);
            A[i][j] = elemento;
        }
    }
    console.log(A);
    let b = [];  
    for(let i=0; i<tam; i++) {
        let termo = "M"+tam.toString()+"t"+(i+1).toString();
        let elemento = document.getElementById(termo).value;
        elemento = parseInt(elemento);
        b[i] = elemento;
    } 

/*
Algoritmo para resolução de sistemas lineares via eliminação de Gauss
Complexidade no tempo: O(n^3)
A é a matriz dos coeficientes do sistema
b é a matriz dos coeficientes dos termos independentes
Forma do sistema (matricial): Ax = b
*/

    var i, j, k, l, m;
    //ETAPA DE ESCALONAMENTO
    for(k = 0; k < A.length - 1; k++){
        //procura o maior k-ésimo coeficiente em módulo
        var max = Math.abs(A[k][k]);
        var maxIndex = k;
        for(i = k + 1; i < A.length; i++){
            if(max < Math.abs(A[i][k])){
                max = Math.abs(A[i][k]);
                maxIndex = i;
            }
        }
        if(maxIndex != k){
            /*
            troca a equação k pela equação com o
            maior k-ésimo coeficiente em módulo
            */
            for(j = 0; j < A.length; j++){
                var temp = A[k][j];
                A[k][j] = A[maxIndex][j];
                A[maxIndex][j] = temp;
            }
            var temp = b[k];
            b[k] = b[maxIndex];
            b[maxIndex] = temp;
        }
        //Se A[k][k] é zero, então a matriz dos coeficiente é singular
        //det A = 0
        if(A[k][k] == 0){
            return null;
        }else{
            //realiza o escalonamento
            for(m = k + 1; m < A.length; m++){
                var F = -A[m][k] / A[k][k];
                A[m][k] = 0; //evita uma iteração
                b[m] = b[m] + F * b[k];
                for(l = k + 1; l < A.length; l++){
                    A[m][l] = A[m][l] + F * A[k][l];
                }
            }
        }
    }
    //ETAPA DE RESOLUÇÃO DO SISTEMA
    var X = [];
    for(i = A.length - 1; i >= 0; i--){
        X[i] = b[i];
        for(j = i + 1; j < A.length; j++){
            X[i] = X[i] - X[j] * A[i][j];
        }
        X[i] = X[i] / A[i][i];
    }
    
    console.log(X);

    //Removendo casas depois da vírgula e formatando saídas
    icognitas = ["X", "Y", "Z", "T", "U", "W", "V", "K", "M", "N"];
    let H=0; 
    let validation = true;
      
    for(let v=0; v < X.length; v++) {
        H = X[v];
        if(typeof(H) === "undefined" || typeof(H) === "null" || isNaN(H)) {
            document.getElementById("ExibirResultado").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            document.getElementById("ExibirResultado3").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            document.getElementById("ExibirResultado4").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            document.getElementById("ExibirResultado5").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            document.getElementById("ExibirResultado6").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            document.getElementById("ExibirResultado7").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            document.getElementById("ExibirResultado8").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            document.getElementById("ExibirResultado9").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            document.getElementById("ExibirResultado10").innerHTML = "SISTEMA IMPOSSÍVEL OU INDERTERMINADO!!!";
            validation = false;
            break;
        } 
    }

    var I=0;
    for(let v=0; v < X.length; v++) {
        H = X[v];
        I = X[v];
        H = H.toFixed(5);
        
        console.log(H);
        if(validation) {
            if(H % 1 === 0) {
                H = Math.round(H, 0);
                X[v] = icognitas[v] + " = " + H.toString();
            } 
            else {
                I = I.toFixed(2);
                X[v] = icognitas[v] + " = " + I.toString();
            }
        }
    }
    if(validation) {
        document.getElementById("ExibirResultado").innerHTML = X;
        document.getElementById("ExibirResultado3").innerHTML = X;
        document.getElementById("ExibirResultado4").innerHTML = X;
        document.getElementById("ExibirResultado5").innerHTML = X;
        document.getElementById("ExibirResultado6").innerHTML = X;
        document.getElementById("ExibirResultado7").innerHTML = X;
        document.getElementById("ExibirResultado8").innerHTML = X;
        document.getElementById("ExibirResultado9").innerHTML = X;
        document.getElementById("ExibirResultado10").innerHTML = X;
    }
    
}