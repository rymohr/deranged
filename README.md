Helpers for working with discontinuous integer ranges.

```
import deranged from 'deranged';

deranged.parse('2005..2008,2010,2015..2018')
// => [2005, 2006, 2007, 2008, 2010, 2015, 2016, 2017, 2018]

deranged.stringify([2005, 2006, 2007, 2008, 2010, 2015, 2016, 2017, 2018])
// => '2005..2008,2010,2015..2018'
```
