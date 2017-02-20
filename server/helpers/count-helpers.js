import Count from '../model/count';
import countId from '../private/countId';

var getCount = function(callback){
  Count.find({_id: countId.id}, (err, count) => {
    callback(count);
  })
}

var incrementCount = function(callback){
  Count.update({$inc: {count: 1}}, (err, count) => {
    callback(count);
  })
}

export { getCount, incrementCount };