package com.apphotel.hotel.service;

import com.apphotel.hotel.model.User;

public interface UserService {
    User registerUser(User user) throws Exception;

     User loginUser(User user) throws Exception;
}
