type Individual = {
    decisionVariable: number[];
    evaluate: () => void;
}

abstract class EvolutionaryAlgorithm {
  protected population: Individual[];

  constructor(protected mutationRate: number, protected crossoverRate: number, protected maxNumberGenerations: number) {
    this.population = [];
  }

  public run() {
    // Population initialization
    this.initPopulation();
    // Hook
    this.afterInitialization();

    // Initial population evaluation
    this.evaluatePopulation();
    // Hook
    this.afterEvaluation();

    // Run the generations of the algorithm
    let currentNumberGeneration = 0;
    while (currentNumberGeneration < this.maxNumberGenerations) {
      // Generate the children
      const children = this.generateChildren();
      // Hook
      this.afterGeneration();

      // Selects the fittest individuals from among parents and children
      this.population = this.selectFittest(children);
      // Hook
      this.afterSurvivorSelection();

      // New generation performed
      currentNumberGeneration++;
    }
  }

  protected evaluatePopulation() {
    console.log(`Template: Evaluating population`);
    this.population.forEach((individual) => {
      individual.evaluate();
    });
  }

  protected generateChildren() {
    console.log(`Template: Generating children`);
    const children: Individual[] = [];

    this.population.forEach((individual) => {
      const otherIndividual = this.population[Math.floor(Math.random() * this.population.length)];

      const [newIndividual, otherNewIndividual] = this.crossover(individual, otherIndividual, this.crossoverRate);

      this.mutation(newIndividual, this.mutationRate);
      this.mutation(otherNewIndividual, this.mutationRate);

      newIndividual.evaluate();
      otherNewIndividual.evaluate();

      children.push(newIndividual, otherNewIndividual);
    });

    return children;
  }

  protected abstract initPopulation(): void;
  protected abstract crossover(firstIndividual: Individual, secondIndividual: Individual, crossoverRate: number): [Individual, Individual];
  protected abstract mutation(individual: Individual, mutationRate: number): void;
  protected abstract selectFittest(children: Individual[]): Individual[];

  protected afterInitialization() {}
  protected afterEvaluation() {}
  protected afterGeneration() {}
  protected afterSurvivorSelection() {}
}


class GenericAlgorithm extends EvolutionaryAlgorithm {
  constructor(protected mutationRate: number, protected crossoverRate: number, protected maxNumberGenerations: number) {
    super(mutationRate, crossoverRate, maxNumberGenerations);
  }

  protected initPopulation(): void {
    console.log(`GA: Initializing population`);

    const firstIndividual = {
      decisionVariable: [1, 2],
      evaluate: () => {},
    };

    const secondIndividual = {
      decisionVariable: [3, 4],
      evaluate: () => {},
    };

    this.population.push(firstIndividual, secondIndividual);
  }

  protected crossover(firstIndividual: Individual, secondIndividual: Individual, crossoverRate: number): [Individual, Individual] {
    console.log(`GA: Applying crossover with crossover rate ${crossoverRate}`);
    return [firstIndividual, secondIndividual];
  }

  protected mutation(_: Individual, mutationRate: number): void {
    console.log(`GA: Applying mutation with mutation rate ${mutationRate}`);
  }

  protected selectFittest(_: Individual[]): Individual[] {
    console.log(`GA: Selecting fittest individuals`);
    return this.population;
  }

  protected afterSurvivorSelection(): void {
    console.log(`GA: After survivor selection`);
  }
}

function clientCode(evolutionaryAlgorithm: EvolutionaryAlgorithm) {
  console.log(`Client: Running algorithm`);
  evolutionaryAlgorithm.run();
}

clientCode(new GenericAlgorithm(0.1, 1.0, 1));
