import Count from '../model/count';
import countId from '../private/countId';

module.exports.getCount = function(callback){
  Count.find({_id: countId.id}, (err, count) => {
    callback(count);
  })
}

module.exports.incrementCount = function(callback){
  Count.update({$inc: {count: 1}}, (err, count) => {
    callback(count);
  })
}
