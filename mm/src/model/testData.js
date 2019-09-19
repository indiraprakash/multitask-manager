import { MultiTaskManagerData } from './MultiTaskManagerData';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';
import { WorkStep } from './WorkStep';
import { WorkStepTypes } from './WorkStepType';
import { Menue } from './Menue';

const getTestData1 = (dataSetName) => {

  const mmData = new MultiTaskManagerData(dataSetName, 1);
  
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen9'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen6'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen7'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen8'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen10'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen16'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen17'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen18'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen19'));
  mmData.recipes.push(getApfelkuchenRecipe('Apfelkuchen110'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen6'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen7'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen8'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen9'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen10'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen16'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen17'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen18'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen19'));
  mmData.recipes.push(getApfelkuchenRecipe('11Apfelkuchen110'));

  const menue1 = new Menue('ApfelkuchenMenue3', null);
  menue1.recipes.push(mmData.recipes[0].clone());
  menue1.recipes.push(mmData.recipes[2].clone());
  menue1.recipes.push(mmData.recipes[3].clone());

  const menue2 = new Menue('ApfelkuchenMenue4', null);
  menue2.recipes.push(mmData.recipes[0].clone());
  menue2.recipes.push(mmData.recipes[3].clone());
  menue2.recipes.push(mmData.recipes[4].clone());

  mmData.menues.push(menue1);
  mmData.menues.push(menue2);

  return mmData;
}

const getTestData = (dataSetName) => {

  const mmData = new MultiTaskManagerData(dataSetName, 1);

  mmData.recipes.push(getApfelkuchenmitStreuselRecipe());
  mmData.recipes.push(getSpaghettiRecipe());
  mmData.recipes.push(getZitronenSorbet());

  const samplemenu = new Menue('CAS Abschlussfeier',null);
  samplemenu.recipes.push(mmData.recipes[0].clone());
    samplemenu.recipes.push(mmData.recipes[1].clone());
    samplemenu.recipes.push(mmData.recipes[2].clone());

    mmData.menues.push(samplemenu);

  return mmData;
}

const getPizzaMitSalat = (dataSetName) => {

  const mmData = new MultiTaskManagerData(dataSetName, 1);
  const menue = new Menue('Pizza mit Rettich-Salat');

  mmData.recipes.push(getSchnellePizzaRezept());
  mmData.recipes.push(getRettichKohlrabiSalatRezept());

  menue.recipes.push(mmData.recipes[0].clone());
  menue.recipes.push(mmData.recipes[1].clone());

  mmData.menues.push(menue);
  return mmData;
}

function getApfelkuchenmitStreuselRecipe(name='Apfelkuchen mit Streusel'){
    const recipe = new Recipe(name, null);
    const ingredients = [
        new Ingredient('Mehl', 575, 'gramm'),
        new Ingredient('Margarine oder Butter', 400,'gramm'),
        new Ingredient('Zucker',225,'gramm'),
        new Ingredient('Ei(er)',1,'Stück'),
        new Ingredient('Vanillezucker',1,'Packung'),
        new Ingredient('Äpfel',6,'Stück'),
        new Ingredient('Apfelmus',350,'gramm'),
        new Ingredient('Zimt', 1 ,'TL'),
        new Ingredient('Salz',1,'Prise'),
        new Ingredient('Walnüsse oder andere Nüsse',100,'gramm')
    ];
    recipe.ingredients=ingredients;
    const worksteps = [
        new WorkStep(0,10,"Teig: Mehl, Fett, Zucker, Ei und Vanillezucker zu einem Teig verarbeiten und auf einem Blech verteilen.",WorkStepTypes.ACTIVE),
        new WorkStep(0,10,"Äpfel schälen und in Stücke schneiden und mit dem Apfelmus vermischen",WorkStepTypes.ACTIVE),
        new WorkStep(0,2,"Masse auf Teig geben",WorkStepTypes.ACTIVE),
        new WorkStep(0,2,"Fett im Topf schmelzen und vom Herd nehmen",WorkStepTypes.ACTIVE),
        new WorkStep(0,2,"die restlichen Zutaten (????) vermischen und dazugeben",WorkStepTypes.ACTIVE),
        new WorkStep(0,20,"Backofen auf 175° vorheizen. Masse abkühlen lassen.",WorkStepTypes.PASSIVE),
        new WorkStep(0,3,"Streusel erzeugen, in dem man Teig in die Hand nimmt und zwischen beiden Händen zerbröselt. Am besten über dem Kuchen",WorkStepTypes.ACTIVE),
        new WorkStep(0,45,"Kuchen auf dem Blech mittlere Schiene bei 175° Heissluft",WorkStepTypes.PASSIVE)
    ];
    recipe.workSteps= worksteps;
    return recipe;
}
function getSpaghettiRecipe(name='Spaghetti Napoli'){
    const recipe = new Recipe(name, null);
    const ingredients = [
        new Ingredient('Basilikum',1,'Bund'),
        new Ingredient('Fleischtomate',4,'Stück'),
        new Ingredient('Knoblauch',1,'Stück'),
        new Ingredient('Spaghetti',400,'gramm'),
        new Ingredient('Olivenöl',1,'EL'),
        new Ingredient('Parmesan',100,'gramm'),
        new Ingredient('Pfeffer',1,'Prise'),
        new Ingredient('Salz', 1, 'Prise'),
        new Ingredient('Wein (rot)',1,'Schuss'),
        new Ingredient('Zucker',1,'Prise'),
        new Ingredient('Zwibeln',1,'Stück')
    ];
    recipe.ingredients=ingredients;
    let ws  = new WorkStep(50,10,"Wasser kochen um Tomaten darin abzutauchen.",WorkStepTypes.PASSIVE);
    ws.alarm.hasAlarmAtEnd=true;
    ws.alarm.hasAlarmAtStart=true;
    recipe.workSteps.push(ws);
    ws = new WorkStep(0,5,"Zwiebel und Knoblauch abziehen und fein hacken",WorkStepTypes.ACTIVE);
    recipe.workSteps.push(ws);
    ws = new WorkStep(0,8,"Tomaten häuten, Stielansätze entfernen und in Würfel scheiden.", WorkStepTypes.ACTIVE);
    recipe.workSteps.push(ws);
    ws = new WorkStep(0,5,"Zwiebeln und Knoblauch in heissem Olivenöl anbraten, dann Rotwein angiessen und bei niedriger Hitze köcheln lassen",WorkStepTypes.ACTIVE);
    recipe.workSteps.push(ws);
    ws = new WorkStep(0,10,"Wasser für Spaghetti kochen.",WorkStepTypes.PASSIVE);
    ws.alarm.hasAlarmAtEnd=true;
    recipe.workSteps.push(ws);
    ws = new WorkStep(0,5,"Tomaten zu Knoblauch und Zwiebel geben. Mit Salz und Pfeffer würzen und Tomaten weich kochen. Am Ende etwas Basilikum dazu geben.",WorkStepTypes.ACTIVE);
    recipe.workSteps.push(ws);
    ws = new WorkStep(0,10,"Spaghetti ins kochende Salzasser geben.",WorkStepTypes.PASSIVE);
    ws.alarm.hasAlarmAtEnd=true;
    recipe.workSteps.push(ws);
    ws = new WorkStep(0,1,"Spaghetti abseihen und in tiefe Teller portionieren, mit Tomatensauce und geriebenem Parmesan servieren.",WorkStepTypes.ACTIVE);
    recipe.workSteps.push(ws);
    return recipe;
}
function getZitronenSorbet(name='Zitronen Sorbet'){
    const recipe = new Recipe(name, null);
    const ingredients = [
        new Ingredient('Zitronensaft',150,'ml'),
        new Ingredient('Zucker',125,'gramm'),
        new Ingredient('Wasser',125,'ml'),
        new Ingredient('Weisswein',125,'ml'),
        new Ingredient('Ei(er)',1,'Stück'),
        new Ingredient('Zitrone',0.5,'Stück')
    ];
    recipe.ingredients=ingredients;
    const worksteps = [
        new WorkStep(0,3,"Eigelb und Eiweiss trennen und Eiweiss aufschlagen",WorkStepTypes.ACTIVE),
        new WorkStep(0,2,"Schale von Zitrone mit Schäler dünn abziehen", WorkStepTypes.ACTIVE),
        new WorkStep(0,5,"Den Zucker und Wasser 5 Minuten aufkochen, bis ein Sirup entsteht, Läuterzucker genannt.",WorkStepTypes.PASSIVE),
        new WorkStep(0,10,"Den Weißwein mit der Zitronenschale einmal aufkochen und 10 Minuten knapp unter dem Siedepunkt ziehen lassen.",WorkStepTypes.PASSIVE),
        new WorkStep(0,15,"Die Zitronenschale entfernen und den Wein zum Läuterzucker geben. Alles mit Zitronensaft gut vermengen, dann die Masse abkühlen lassen.",WorkStepTypes.PASSIVE),
        new WorkStep(0,2,"Nun das aufgeschlagene Eiweiss unterheben",WorkStepTypes.ACTIVE),
        new WorkStep(0,2,"test",WorkStepTypes.ACTIVE),
        new WorkStep(0,1,"Masse in eine große Schüssel geben. Die Schüssel sollte mindestens doppelt so groß sein wie der Inhalt. In den Tiefkühler stellen.",WorkStepTypes.ACTIVE),
        new WorkStep(0,90,"Aus dem Tiefkühler nehmen und mit einem starken Schwingbesen kräftig durchrühren und alles vom Rand lösen. Richtig Luft darunter schlagen, damit eine geschmeidig und luftige  Masse entsteht. Danach wieder in den Tiefkühler stellen.",WorkStepTypes.PASSIVE),
        new WorkStep(0,60,"Aus dem Tiefkühler nehmen und mit einem starken Schwingbesen kräftig durchrühren und alles vom Rand lösen. Richtig Luft darunter schlagen, damit eine geschmeidig und luftige  Masse entsteht. Danach wieder in den Tiefkühler stellen.",WorkStepTypes.PASSIVE),
        new WorkStep(0,45,"Aus dem Tiefkühler nehmen und mit einem starken Schwingbesen kräftig durchrühren und alles vom Rand lösen. Richtig Luft darunter schlagen, damit eine geschmeidig und luftige  Masse entsteht. Danach wieder in den Tiefkühler stellen.",WorkStepTypes.PASSIVE),
        new WorkStep(0,30,"Aus dem Tiefkühler nehmen und mit einem starken Schwingbesen kräftig durchrühren und alles vom Rand lösen. Richtig Luft darunter schlagen, damit eine geschmeidig und luftige  Masse entsteht. Danach wieder in den Tiefkühler stellen.",WorkStepTypes.PASSIVE),
        new WorkStep(0,30,"Aus dem Tiefkühler nehmen und mit einem starken Schwingbesen kräftig durchrühren und alles vom Rand lösen. Richtig Luft darunter schlagen, damit eine geschmeidig und luftige  Masse entsteht. Danach wieder in den Tiefkühler stellen.",WorkStepTypes.PASSIVE),
        new WorkStep(0,1,"Wenn eine softeisartige Masse entstanden ist, kann man das Eis in eine lagerfähige Form umfüllen oder gleich verzehren",WorkStepTypes.ACTIVE)
    ];
    recipe.workSteps=worksteps;
    return recipe;
}
function getApfelkuchenRecipe(name = 'Apfelkuchen') {
  const recipe = new Recipe(name, null);

  const ingredients = [
    new Ingredient('Weissmehl', 500, 'gramm'),
    new Ingredient('Äpfel', 4, 'Stück'),
    new Ingredient('Eier', 3, 'Stück'),
    new Ingredient('Zucker', 100, 'gramm'),
    new Ingredient('Puderzucker', 100, 'gramm')
  ];
  recipe.ingredients = ingredients;

  const workStep1 = new WorkStep(
    0, 15, 'Mehl, Eier und Zucker zu einem Teig verkneten', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep1);

  const workStep2 = new WorkStep(0, 45, 'Teig gehen lassen', WorkStepTypes.PASSIVE);
  recipe.workSteps.push(workStep2);

  const workStep3 = new WorkStep(
    0, 60, 'Teigen in eine Form giessen und bei 200 Grad backen', WorkStepTypes.PASSIVE);
  recipe.workSteps.push(workStep3);

  const workStep4 = new WorkStep(
    0, 10, 'Kuchen mit Puderzucker bestreuen', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep4);

  return recipe;
}


function getRettichKohlrabiSalatRezept(name = 'Rettich Kohlrabi Salat') {

  const recipe = new Recipe(name, null);

  const ingredients = [
    new Ingredient('Bierrettich', 1, 'Stück'),
    new Ingredient('Kohlrabi', 1, 'Stück'),
    new Ingredient('Rapsöl', 3, 'Esslöffel'),
    new Ingredient('Frischer Dill', 2, 'Zweige'),
    new Ingredient('Salatkräuter', 1, 'Teelöffel'),
    new Ingredient('Senf', 1, 'Teelöffel'),
    new Ingredient('Salz', 1, 'Prise'),
    new Ingredient('Pfeffer', 1, 'Prise'),
    new Ingredient('Paprika', 1, 'Prise'),
    new Ingredient('Rahm', 1, 'Schuss')
  ];
  recipe.ingredients = ingredients;

  const workStep1 = new WorkStep(
    0, 5, 'Den Kohlrabi schälen, den Bierrettich waschen', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep1);

  const workStep2 = new WorkStep(
    0, 5, 'Kohlrabi und Rettich mittelfein raffeln, auspressen und vermischen', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep2);

  const workStep3 = new WorkStep(
    0, 10, 'Die Kohlrabi und Rettich Mischung auflockern und etwas an der Luft trocknen lassen', WorkStepTypes.PASSIVE);
  recipe.workSteps.push(workStep3);
  workStep3.alarm.hasAlarmAtEnd = true;

  const workStep4 = new WorkStep(
    0, 2, 'Für die Salatsauce das Rapsöl, den Balsamico und Senf in einer kleinen Schale gut verrühren', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep4);

  const workStep5 = new WorkStep(
    0, 4, 'Den Dill klein hacken und in die Sauce geben', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep5);

  const workStep6 = new WorkStep(
    0, 2, 'Salz, Pfeffer, Paprika, Salatkräuter und Rahm hinzugeben und gut umrühren', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep6);

  const workStep7 = new WorkStep(
    0, 2, 'Die fertige Sauce mit dem Rettich und Kohlrabi vermischen', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep7);

  return recipe;

}

function getSchnellePizzaRezept(name = 'Schnelle Pizza') {

  const recipe = new Recipe(name, null);

  const ingredients = [
    new Ingredient('Fladenbrot', 1, 'Stück'),
    new Ingredient('Tomaten', 3, 'Stück'),
    new Ingredient('Oregano', 1, 'Teelöffel'),
    new Ingredient('Olivenöl', 1, 'Esslöffel'),
    new Ingredient('Mozzarella', 150, 'Gramm')
  ];
  recipe.ingredients = ingredients;

  // const workStep1 = new WorkStep(
  //   0, 1, 'Backofen auf 160 Grad vorheizen', WorkStepTypes.ACTIVE);
  // recipe.workSteps.push(workStep1);

  const workStep2 = new WorkStep(
    0, 5, 'Mozzarella und Tomaten in Scheiben schneiden', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep2);

  const workStep3 = new WorkStep(
    0, 3, 'Die Zwiebel in Streifen schneiden un mit dem Olivenöl vermischen', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep3);

  const workStep6 = new WorkStep(
    0, 10, 'Die Zwiebel-Olivenöl-Mischung etwas ziehen lassen', WorkStepTypes.PASSIVE);
  recipe.workSteps.push(workStep6);
  workStep6.alarm.hasAlarmAtEnd = true;

  const workStep4 = new WorkStep(
    0, 4, 'Mozarella, Tomaten und Zwiebel auf dem Fladenbrot verteilen und mit Oregano bestreuen', WorkStepTypes.ACTIVE);
  recipe.workSteps.push(workStep4);

  const workStep5 = new WorkStep(
    0, 15, 'Fladenbrot im vorgeheizen Ofen für 20 Minuten bei 160 Grad backen', WorkStepTypes.PASSIVE);
  recipe.workSteps.push(workStep5);
  workStep5.alarm.hasAlarmAtEnd = true;

  return recipe;
}


export default  [
  {
    name: 'testDataSet1',
    func: getTestData1
  },
  { name: 'testDataSet',
    func: getTestData
  },
  {
    name: 'Pizza mit Salat',
    func: getPizzaMitSalat
  }
];