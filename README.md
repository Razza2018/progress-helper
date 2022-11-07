# progress-bar

**Instructions**

Add progress helper to your project
```
const progressHelper = require('path/to/progress-helper');
```

Set progress bar total before starting loop
```
progressHelper.setTotal(items.length);
```

Increment progress bar count at the start of the loop
```
progressHelper.setCurrent(i);
```

Clear the progress bar text before you console log anything
```
progressHelper.clearProgress();
```

Print the progress bar text before you make slow changes
```
progressHelper.printProgress();
```
