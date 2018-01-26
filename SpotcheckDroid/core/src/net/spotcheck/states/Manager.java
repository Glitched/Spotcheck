package net.spotcheck.states;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import net.spotcheck.SpotCheck;

public abstract class Manager {

    public SpotCheck MainLink;

    public Manager(SpotCheck reference){
        MainLink = reference;
    }

    public void update(float deltaTime){

    }

    public void render(SpriteBatch batch){

    }
}
