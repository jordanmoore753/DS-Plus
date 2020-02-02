# Plus

*Plus* is a library of **all** the most popular methods in modern programming languages, like *Python* and *Ruby*. 

## Array

`sort` is an easy candidate for improvement. Including some concrete sorting methods, like `sortByAscending` and `sortByDescending` are great improvements beyond JS' current `sort` method. Non-destructive!

`reverse` that does **not** mutate the `Array` would be a nice option.

`count` the amount of elements that match a passed value.

`last` to return the last element of an `Array`.

`first` to return the first element of an `Array`.

`toObject` to return an `Object` with the `Array` keys and values in `Object` form.

`fromArray(arrayToAppendTo, dummy, i)` will append elements from `dummy` onto the end of `arrayToAppendTo`, or if specified, the `i` (index) where to start placing elements. 

`deleteAll` is a simple method that returns the `Array` with the specified element deleted (all instances of that element).

`delete(matchingElement, fromStart || fromEnd)` is another method that returns the `Array` with the first instance of the specified element removed, either starting from the front of the `Array` or the end.

`take(array, numberOfElements, i)` returns `numberOfElements` elements starting from index `i`. Defaults to `0`.

`uniq(array)` returns a new `Array` of only non-repeated elements from `array`.

`deleteAt(array, i)` will return a new `Array` with the element at `i` removed.

## String

`capitalize(string)` will return a new `String` with the first character upcased.

`titleize(string, delimiter)` will return a new `String`. The input `string` will be `split` by the passed `delimiter` (`_`, `,`, ` `). Then, every word will be capitalized.

`delete(string, matchingElement, start || end)` returns a new `String` with the first instance of `matchingElement` removed from either the end or start of the `String`.

`deleteAll` does the same exact thing but with **all** instances of the `matchingElement`.

`eachChar` iterates over the passed `string` and can be passed a function to perform some operation with. This will be **super** convenient.

`chop(string)` returns a new `String` with the last character removed. 

`chars` returns an `Array` of the passed `string`.

## Number

`divMod(num, numeric)` this will perform the exact operation from *Ruby*. Returns a new `Array` containing the quotient and modulus obtained from dividing `num` by `numeric`.

`random(min, max)` returns a new `Number` which is the random number generated between `min` and `max` values.

`isNegative(number)` returns `true` or `false` based on `number` being greater than or equal to `0`.

`isPositive(number)` does the opposite of `isNegative`.

`isNonZero(number)` returns `false` if `number` is not `0`, returns `undefined` if it is `0`.

`isFloat(number)` returns `true` or `false`.

`step` seems to be an important one. Read more on this: [Step Doc](https://devdocs.io/ruby~2.6/numeric#method-i-step).

`abs(number)` returns the absolute value of `number`.

## Object

`each_pair(obj, callback)` will iterate over the given `Object` by `key:value` pair and invoke the callback for each pair.

`each_key(obj, callback)` will iterate over the given `Object` and will invoke its `callback` with each `key`.

`each` is the same as `each_pair`. 

`fetch(obj, key)` returns a value from the `Object` for the given `key`. If `key` does not exist, `undefined` will be returned.

`fetchValues(obj, [keys])` returns a new `Array` of values from `obj` which are associated with a `key` of `[keys]`.

`hasValue(obj, value)` returns `true` or `false`.

`compact(obj)` returns a new `Object` with all `undefined` values removed (removes the key as well).

`delete(obj, key)` returns a new `Object` with the given key:value pair removed from it.

`deleteIf(obj, key, callback)` is an interesting one. Read more: [delete_if](https://devdocs.io/ruby~2.6/hash#method-i-delete_if)