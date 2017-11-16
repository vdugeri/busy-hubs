update(user, done) {
  return async.auto({
    userLikes: done => {
      return this.engine.likes.itemsByUser(user, done);
    },
    userDislikes: done => {
      return this.engine.dislikes.itemsByUser(user, done);
    }
  }, (err, { userLikes, userDislikes }) => {
      if (err != null) {
        return done(err);
      }

      const items = _.flatten([userLikes, userDislikes]);
      return async.map(items, (item, done) => {
        return async.map([
          this.engine.likes,
          this.engine.dislikes

        ], (rater, done) => {
          return rater.usersByItem(item, done);
        }, done);
      } ,(err, others) => {
          if (err != null) {
            return done(err);
          }
          others = _.without(_.unique(_.flatten(others)), user);

          return this.db.delete({ user }, err => {
            if (err != null) {
              return done(err);
            }

            return async.map(others, (other, done) => {
              return async.auto({
                otherLikes: done => {
                  return this.engine.likes.itemsByUser(other, done);
                },

                otherDislikes: done => {
                  return this.engine.dislikes.itemsByUser(other, done);
                }
              }, (err, { otherLikes, otherDislikes }) => {
                  if (err != null) {
                    return done(err);
                  }
                  return done(null, {
                    user: other,
                    similarity: ((_.intersection(userLikes, otherLikes).length + _.intersection(userDislikes, otherDislikes).length) - _.intersection(userLikes, otherDislikes).length - _.intersection(userDislikes, otherLikes).length) / _.union(userLikes, otherLikes, userDislikes, otherDislikes).length
                  }
                  );
                });
            }, (err, others) => {
                if (err != null) {
                  return next(err);
                }
                return this.db.insert({
                  user,
                  others
                }, done);
              });
          });
        });
    });
}
