import './style.css'
import { runInferenceDemo } from './topics/1-inference'
import { runInterfacesDemo } from './topics/2-interfaces-types'
import { runGenericsDemo } from './topics/3-generics'
import { runUtilityTypesDemo } from './topics/4-utility-types'
import { runNarrowingDemo } from './topics/5-narrowing'
import { runPitfallsDemo } from './topics/6-pitfalls'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>TypeScript Interview Prep</h1>
    <p>Check the <strong>Browser Console</strong> (F12) to see the logs for each topic.</p>
    <div class="card">
      <button id="run-all" type="button">Run All Demos Again</button>
    </div>
  </div>
`

function runAll() {
  console.clear();
  console.log("Running all topics...");
  runInferenceDemo();
  runInterfacesDemo();
  runGenericsDemo();
  runUtilityTypesDemo();
  runNarrowingDemo();
  runPitfallsDemo();
}

// Run on load
runAll();

document.querySelector('#run-all')?.addEventListener('click', runAll);
