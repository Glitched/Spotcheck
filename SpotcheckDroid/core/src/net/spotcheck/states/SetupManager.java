package net.spotcheck.states;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import net.spotcheck.SpotCheck;
import net.spotcheck.setupstates.ConnectSpotify;
import net.spotcheck.setupstates.*;

public class SetupManager extends Manager {

    // Setup States
    public enum SetupStates {RESOURCE_LOAD, CONNECT_SPOTIFY, ROOM_LOBBY};

    // Set current state
    SetupStates setupState = SetupStates.RESOURCE_LOAD;

    // States
    ResourceLoad resourceLoad;
    ConnectSpotify connectSpotify;
    RoomLobby roomLobby;

    public SetupManager(SpotCheck reference){
        super(reference);

        resourceLoad = new ResourceLoad(MainLink);
        connectSpotify = new ConnectSpotify(MainLink);
        roomLobby = new RoomLobby(MainLink);
    }

    @Override
    public void update(float deltaTime){
        // Update Game State
        switch (setupState){
            case RESOURCE_LOAD:
                resourceLoad.update(deltaTime);
                break;
            case CONNECT_SPOTIFY:
                connectSpotify.update(deltaTime);
                break;
            case ROOM_LOBBY:
                roomLobby.update(deltaTime);
                break;
            default:
                System.out.println("SOMETHING IS WRONG");
                System.exit(1);
        }
    }

    @Override
    public void render(SpriteBatch batch){

        // Render Game State
        switch (setupState){
            case RESOURCE_LOAD:
                resourceLoad.render(batch);
                break;
            case CONNECT_SPOTIFY:
                connectSpotify.render(batch);
                break;
            case ROOM_LOBBY:
                roomLobby.render(batch);
                break;
            default:
                System.out.println("SOMETHING IS WRONG");
                System.exit(1);
        }


    }

    public SetupStates getSetupState() {
        return setupState;
    }

    public void setSetupState(SetupStates setupState) {
        this.setupState = setupState;
    }
}
