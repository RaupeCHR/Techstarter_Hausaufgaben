class Auto {

    #marke = "defaultMark";
    #modell = "defaultModel";
    #baujahr = 1800;

    constructor(marke, modell, baujahr) {
      this.marke = marke;
      this.modell = modell;
      this.baujahr = baujahr;
    }

    compairCars(auto) {
        return (
            auto.getMarke ===  this.#marke &&
            auto.getModell === this.#modell &&
            auto.getBaujahr !== this.#baujahr
        );
    }

    getMarke(){
        return this.#marke;
    }

    getModell(){
        return this.#modell;
    }

    getBaujahr(){
        return this.#baujahr;
    }



  }


function  compairCars(auto1,auto2){
    return (
        auto1.marke ===  auto2.marke &&
        auto1.modell === auto2.modell &&
        auto1.baujahr !== auto2.baujahr
    );
}


auto1 = new Auto("BMW","320","1989");
auto2 = new Auto("Audi","A3","1960");

auto1.marke = "hyundai";
auto2.marke = "Ford"

console.log(auto1.compairCars(auto2));
